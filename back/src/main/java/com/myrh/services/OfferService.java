package com.myrh.services;

import com.myrh.models.Offer;
import com.myrh.repositories.OfferRepository;
import com.myrh.utils.Enum;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Repository
public class OfferService {
    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> listAll(){
        return offerRepository.findAll();
    }

    public List<Offer> listAllAcceptedOffers(){
        return offerRepository.findAll()
                .stream()
                .filter(offer -> Objects.equals(offer.getStatus(), Enum.status.Accepted.toString()))
                .collect(Collectors.toList());
    }

    public Offer getOfferById(Long id){
        Optional offer = offerRepository.findById(id);
        if(offer.isPresent())
            return ((Offer) offer.get()).getStatus().equals(Enum.status.Accepted.toString()) ? (Offer) offer.get() : null;
        return null;
    }

    public Offer save(Offer offer){
        return offerRepository.save(offer);
    }

    public void updateOffer(Long id, Offer offer){
        // ...
    }

    public List<Offer> getOffersByCompany(Long companyId){
        return offerRepository.findAllByCompanyId(companyId);
    }
}
